import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/db";
import { getLanesWithTicketAndTags, getPipelineDetails } from "@/lib/query";
import { LaneDetail } from "@/lib/types";
import { redirect } from "next/navigation";
import React from "react";
import PipelineInfoBar from "../_components/pipeline-infobar";
import PipelineSettings from "../_components/pipeline-settings";
import { Eye, Settings, Settings2 } from "lucide-react";

type Props = {
  params: {
    subaccountId: string;
    pipelineId: string;
  };
};

const PipelinePage = async ({ params }: Props) => {
  const pipelineDetails = await getPipelineDetails(params.pipelineId);

  if (!pipelineDetails) {
    return redirect(`/subaccount/${params.subaccountId}/pipelines`);
  }
  const pipelines = await db.pipeline.findMany({
    where: {
      subAccountId: params.subaccountId,
    },
  });
  const lanes = (await getLanesWithTicketAndTags(
    params.pipelineId
  )) as LaneDetail[];

  return (
    <Tabs defaultValue="view" className="w-full">
      <TabsList className="bg-transparent border-b-2 h-16 w-full justify-between mb-4">
        <PipelineInfoBar
          pipelineId={params.pipelineId}
          subAccountId={params.subaccountId}
          pipelines={pipelines}
        />
        <div>
          <TabsTrigger value="view" className=""><Eye className="h-5 w-5 mr-2"/>Pipeline View</TabsTrigger>
          <TabsTrigger value="settings"><Settings className="h-5 w-5 mr-2"/>Settings</TabsTrigger>
        </div>
      </TabsList>
      <TabsContent value="view">
        {/* <PipelineView/> */}
      </TabsContent>
      <TabsContent value="settings">
        <PipelineSettings
          key={pipelineDetails.id}
          pipelineId={params.pipelineId}
          subaccountId={params.subaccountId}
          pipelines={
            pipelines
          }
        />
      </TabsContent>
    </Tabs>
  );
};

export default PipelinePage;
