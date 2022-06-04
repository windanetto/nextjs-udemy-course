import EventLIst from "../components/events/event-list";
import { getFeaturedEvents } from "../dummy-data";

export default function Home() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div><EventLIst items={featuredEvents} /></div>
  )
}
