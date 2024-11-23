import { ProductCard } from "@/app/components/ProductCard";
import prisma from "@/app/lib/db";
import { type CategoryTypes } from "@prisma/client";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

const LAST_QUERY_TIMESTAMP_KEY = "lastQueryTimestamp";
const PING_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Helper function to get last query timestamp from localStorage
const getLastQueryTimestamp = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem(LAST_QUERY_TIMESTAMP_KEY);
    }
    return null;
};

// Helper function to set the last query timestamp in localStorage
const setLastQueryTimestamp = () => {
    if (typeof window !== "undefined") {
        localStorage.setItem(LAST_QUERY_TIMESTAMP_KEY, Date.now().toString());
    }
};

// Sample function to simulate the "keep-alive" query
const keepDatabaseAlive = async () => {
    const lastQueryTimestamp = getLastQueryTimestamp();
    const now = Date.now();

    // Only run the query if 24 hours have passed since the last query
    if (lastQueryTimestamp && now - Number(lastQueryTimestamp) < PING_INTERVAL) {
        console.log("Query skipped. 24 hours have not passed yet.");
        return; // Skip if 24 hours haven't passed
    }

    // Set the timestamp for the next query
    setLastQueryTimestamp();

    // Sample database query to keep the connection alive (no need to use results)
    await prisma.product.findMany({
        take: 1, // Just taking 1 record to keep it light
        select: {
            id: true,
        },
    });

    console.log("Database keep-alive query executed.");
};

async function getData(category: string) {
    let input;

    switch (category) {
        case "template": {
            input = "template";
            break;
        }
        case "uikit": {
            input = "uikit";
            break;
        }
        case "icon": {
            input = "icon";
            break;
        }
        case "all": {
            input = undefined;
            break;
        }
        default: {
            return notFound();
        }
    }

    // Execute the actual category data query
    const data = await prisma.product.findMany({
        where: {
            category: input as CategoryTypes,
        },
        select: {
            id: true,
            images: true,
            smallDescription: true,
            name: true,
            price: true,
        },
    });

    return data;
}

export default async function CategoryPage({
    params,
}: {
    params: { category: string };
}) {
    noStore();

    // Execute the keep-alive query (this will run once every 24 hours)
    await keepDatabaseAlive();

    const data = await getData(params.category);
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">
                {data.map((product) => (
                    <ProductCard
                        key={product.id}
                        images={product.images}
                        price={product.price}
                        name={product.name}
                        id={product.id}
                        smallDescription={product.smallDescription}
                    />
                ))}
            </div>
        </section>
    );
}
