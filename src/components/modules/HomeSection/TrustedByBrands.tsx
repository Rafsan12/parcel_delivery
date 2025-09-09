import StatsCount from "@/components/ui/statscount";

export default function TrustedByBrands() {
  const stats = [
    { value: 500, suffix: "+", label: "Businesses trust us" },
    { value: 10000, suffix: "+", label: "Parcels sent daily" },
    { value: 99, suffix: "%", label: "On-time delivery rate" },
  ];
  return (
    <>
      <StatsCount stats={stats} title="Trusted by Senders Nationwide" />
    </>
  );
}
