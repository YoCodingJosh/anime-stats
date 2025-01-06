import { createFileRoute, redirect } from "@tanstack/react-router";
import { userDataAtom, store } from "@/atoms";
import { useAtomValue } from "jotai";

export const Route = createFileRoute("/stats/")({
  component: RouteComponent,
  beforeLoad: async () => {
    const userData = store.get(userDataAtom);

    if (!userData) {
      // TODO: Show a toast or something
      throw redirect({
        to: "/",
        replace: true,
      });
    }
  },
});

function RouteComponent() {
  const userData = useAtomValue(userDataAtom);

  // Should never happen, but just for type safety
  if (!userData) {
    return null;
  }

  return <div>Hello {userData?.username}!</div>;
}
