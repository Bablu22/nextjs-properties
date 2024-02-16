import PageTitle from "@/components/PageTitle";
import { subscriptionPlans } from "@/lib/constant";
import SubscriptionPlans from "./_component/SubscriptionPlans";
import { GetCurrentUserFromDB } from "@/actions/user";
import prisma from "@/config/db";

const SubscriptionPlan = async () => {
  const mongoUser = (await GetCurrentUserFromDB()).data;
  const subscription: any = await prisma.subscription.findFirst({
    where: {
      userId: mongoUser?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="">
      <PageTitle title="Subscription Plans" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subscriptionPlans?.map((plan, index) => (
          <SubscriptionPlans
            key={index}
            plan={plan}
            subscription={subscription}
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlan;
