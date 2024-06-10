import BlurePage from "@/components/global/blure-page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFunnel } from "@/lib/query";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import FunnelSteps from "./_components/funnel-step";
import FunnelSettings from "./_components/funnel-settings";

type Props = {
  params: {
    funnelId: string;
    subaccountId: string;
  };
};

const page = async ({ params }: Props) => {


  const funnelPages = await getFunnel(params.funnelId);
  if (!funnelPages)
    return redirect(`/subaccount/${params.subaccountId}/funnels`);

  return (
    <BlurePage>
      <Link
        href={`/subaccount/${params.subaccountId}/funnels`}
        className="flex justify-between gap-4 mb-4 text-muted-foreground"
      >
        Back
      </Link>
      <h1 className="text-3xl mb-8">{funnelPages.name}</h1>
      <Tabs defaultValue="steps" className="w-full">
        <TabsList className="grid  grid-cols-2 w-[50%] bg-transparent ">
          <TabsTrigger value="steps">Steps</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="steps">
          <FunnelSteps
            funnel={funnelPages}
            subaccountId={params.subaccountId}
            pages={funnelPages.FunnelPages}
            funnelId={params.funnelId}
          />
        </TabsContent>
        <TabsContent value="settings">
          <FunnelSettings
            subaccountId={params.subaccountId}
            defaultData={funnelPages}
          />
        </TabsContent>
      </Tabs>
    </BlurePage>
  );
};

export default page;
