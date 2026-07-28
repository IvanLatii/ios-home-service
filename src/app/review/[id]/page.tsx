import { notFound } from "next/navigation";
import { ReviewScreen } from "@/components/service/review-screen";
import { getService } from "@/lib/services-data";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    option?: string;
    date?: string;
    time?: string;
  }>;
}

export default async function ReviewPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { option: optionId, date = "", time = "" } = await searchParams;

  const service = getService(id);
  if (!service) notFound();

  const option =
    service.options.find((o) => o.id === optionId) ?? service.options[0];
  if (!option) notFound();

  return (
    <ReviewScreen
      serviceTitle={service.title}
      optionLabel={option.label}
      optionPrice={option.price}
      serviceId={id}
      rawId={id}
      optionId={option.id}
      date={date}
      time={decodeURIComponent(time)}
    />
  );
}
