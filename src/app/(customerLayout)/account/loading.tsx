import {
  OrderListSkeleton,
  ProfileHeaderSkeleton,
} from "@/src/components/UI/Skeleton";

export default function AccountLoading() {
  return (
    <div className="col-span-12 lg:col-span-9 space-y-6 p-4">
      <ProfileHeaderSkeleton />
      <OrderListSkeleton count={3} />
    </div>
  );
}
