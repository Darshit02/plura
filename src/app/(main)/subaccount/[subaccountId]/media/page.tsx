import BlurePage from '@/components/global/blure-page'
import MediaComponent from '@/components/media'
import { getMedia } from '@/lib/query'
import React from 'react'

type Props = {
    params : {
        subaccountId: string
    }
}

const MediaPage = async ({
    params
}: Props) => {
    const data = await getMedia(params.subaccountId)
  return (
    <BlurePage>
<MediaComponent
data={data}
subaccountId={params.subaccountId}
/>
    </BlurePage>
  )
}

export default MediaPage