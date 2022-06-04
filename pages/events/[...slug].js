import { useRouter } from "next/router"
import { Fragment } from "react";
import EventLIst from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../dummy-data";

export default function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;
  
  if (!filterData) {
    return <p className='center'>Loading...</p>
  }

  const filteredYear = filterData[0];
  const filterMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filterMonth;

  if (
    isNaN(numYear) || 
    isNaN(numMonth) || 
    numYear > 2030 || 
    numYear < 2021 || 
    numMonth < 1 || 
    numMonth > 12
  ) {
    return <p>Invalid Filter. Please adjust your values!</p>
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert><p>No events found for the chosen filter!</p></ErrorAlert>
        <div className="center">
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventLIst items={filteredEvents} />
    </Fragment>
  )
}
