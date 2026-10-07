import { redirect } from "next/navigation";

// Startsidan visas via app/[locale] – middleware skickar hit besökaren automatiskt.
export default function Root() {
  redirect("/sv");
}
