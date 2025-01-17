import { createFileRoute, redirect } from "@tanstack/react-router";
import { userDataAtom, store } from "@/atoms";
import { useAtomValue } from "jotai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoadingSpinner from "@/components/LoadingSpinner";

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

    // TODO: Check if the user has cached stats data (and if it's stale)
  },
});

function RouteComponent() {
  const userData = useAtomValue(userDataAtom);

  // Should never happen, but just for type safety
  if (!userData) {
    return null;
  }

  return (
    <div>
      <Avatar>
        <AvatarImage src={userData.avatar} alt={`Avatar image of ${userData.username}`} />
        <AvatarFallback>Yo!</AvatarFallback>
      </Avatar>
      <span>Hello {userData.username}!</span>
      <LoadingSpinner />
    </div>
  );
}
