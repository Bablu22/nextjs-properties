import { GetCurrentUserFromDB } from "@/actions/user";
import Filters from "@/components/Filters";
import { UserButton, currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import HomeProperties from "./_component/HomeProperties";
import Loader from "@/components/Loader";

export default async function Home({ searchParams }: { searchParams: any }) {
  const key = JSON.stringify(searchParams);

  return (
    <div>
      <Filters searchParams={searchParams} />
      <div>
        <Suspense fallback={<Loader key={key} />}>
          <HomeProperties searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
