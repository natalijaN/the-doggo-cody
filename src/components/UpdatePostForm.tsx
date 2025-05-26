import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { updatePost } from "../actions/mutatePosts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

export default function UpdatePostForm({ post, onSuccess }: any) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      toast.success("Post updated!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onSuccess();
    },
    onError: () => {
      toast.error("Something went wrong, please try again.");
    },
  });

  const form = useForm({
    defaultValues: {
      title: post.title,
      description: post.description,
      breed: post.breed,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate({
        id: post.id,
        title: value.title,
        description: value.description,
        breed: value.breed,
      });
    },
  });
  return (
    <form
      className="bg-white rounded-md px-40 py-5 flex flex-col justify-center gap-10"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div>
        <form.Field
          name="title"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "A Title is required"
                : value.length < 4
                  ? "Title must be at least 4 characters"
                  : undefined,
          }}
          children={(field) => {
            return (
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <label
                    className="font-bold text-gray-700 text-xl"
                    htmlFor={field.name}
                  >
                    Title:
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    className="px-4 py-2 mt-2 mx-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>

                <FieldInfo field={field} />
              </div>
            );
          }}
        />
      </div>
      <div>
        <form.Field
          name="description"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "A Description is required"
                : value.length < 10
                  ? "Description must be at least 10 characters"
                  : undefined,
          }}
          children={(field) => {
            return (
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <label
                    className="font-bold text-gray-700 text-xl"
                    htmlFor={field.name}
                  >
                    Description:
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    className="px-4 py-2 mt-2 mx-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
                <FieldInfo field={field} />
              </div>
            );
          }}
        />
      </div>
      <div>
        <form.Field
          name="breed"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "Breed is required"
                : value.length < 3
                  ? "Breed must be at least 3 characters"
                  : undefined,
          }}
          children={(field) => {
            return (
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <label
                    className="font-bold text-gray-700 text-xl"
                    htmlFor={field.name}
                  >
                    Breed:
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    className="px-4 py-2 mt-2 mx-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
                <FieldInfo field={field} />
              </div>
            );
          }}
        />
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <div className="flex justify-around gap-5">
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
              disabled={!canSubmit}
            >
              {isSubmitting ? "..." : "Submit"}
            </button>
            <button
              type="reset"
              className="w-full py-2 mt-4 bg-white text-red-600 rounded-lg border border-red-600 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
              onClick={() => form.reset()}
            >
              Reset
            </button>
          </div>
        )}
      />
    </form>
  );
}
