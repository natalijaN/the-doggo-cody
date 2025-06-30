import UploadForm from "@/src/components/UploadForm";
import { Suspense } from "react";

export default function DogClassifierPage() {
  return (
    <div className="min-w-[700px] mx-auto mt-10 px-4 ">
      <h1 className="text-2xl font-semibold mb-4 flex text-center justify-center">
        Dog Classifier!
      </h1>
      <p className="flex justify-center items-center mb-8 text-gray-600">
        Upload a photo of your dog and wait for breed guess.
      </p>
      <Suspense fallback={<p>Loading form...</p>}>
        <UploadForm />
      </Suspense>
    </div>
  );
}
