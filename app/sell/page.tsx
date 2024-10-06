import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectCategory } from "../components/SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import { TipTapEditor } from "../components/Editor";
import { UploadDropzone } from "../lib/uploadthing";

export default async function SellRoute() {



    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
            <Card>

                <form >
                    <CardHeader>
                        <CardTitle>Sell your product with ease</CardTitle>
                        <CardDescription>
                            Please describe your product here in detail so that it can be sold
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-10">
                        <div className="flex flex-col gap-y-2">
                            <Label>Name</Label>
                            <Input
                                name="name"
                                type="text"
                                placeholder="Name of your Product"
                                required
                                minLength={3}
                            />
                            {/* {state?.errors?.["name"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["name"]?.[0]}</p>
          )} */}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Category</Label>
                            <SelectCategory />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Price</Label>
                            <Input
                                placeholder="29$"
                                type="number"
                                name="price"
                                required
                                min={1}
                            />

                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>Small Summary</Label>
                            <Textarea
                                name="smallDescription"
                                placeholder="Pleae describe your product shortly right here..."
                                required
                                minLength={10}
                            />
                            {/* {state?.errors?.["smallDescription"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["smallDescription"]?.[0]}
            </p>
          )} */}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Desciption</Label>
                            <TipTapEditor />

                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Product Images</Label>
                            <UploadDropzone endpoint="imageUploader" />

                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Product File</Label>
                            <UploadDropzone endpoint="productFileUpload" />

                        </div>
                    </CardContent>
                </form>
            </Card>
        </section>
    );
}