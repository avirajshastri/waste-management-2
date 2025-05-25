
export function groupRequestByLocationAndDate(requests:any[]){
    const grouped: Record<string,{UnitA: number, UnitB: number}> = {};

    requests.forEach((req:any)=>{
        const date = new Date(req.requestedAt).toISOString().split('T')[0];

        if(!grouped[date]){
            grouped[date] = {UnitA:0, UnitB:0};
        }

        if(req.location === 'UnitA'){
            grouped[date].UnitA+=1
        }
        else if(req.location === 'UnitB')
        {
            grouped[date].UnitB+=1;
        }


    })
    const groupedArray = Object.entries(grouped).map(([date,counts])=>({
        date,
        ...counts
    }))

    groupedArray.sort((a,b)=> new Date(a.date).getTime() - new Date(b.date).getTime());
    return groupedArray
}


export function groupRequestByStatus(requests:any[]){
    type Status = 'PENDING' | 'ACCEPTED' | 'CANCELLED' | 'COMPLETED';
    const statusCount:{[key in Status]: number} = {
        PENDING:0,
        ACCEPTED:0,
        CANCELLED:0,
        COMPLETED:0,
    };

    requests.forEach((req:any) =>{
        const status = req.status?.toUpperCase() as Status
        if(statusCount[status] !== undefined) statusCount[status]++;
    })

    return Object.entries(statusCount).map(([status, count]) => ({
        status,
        count,
    }));

}

export function groupRequestByWasteType(requests:any[]){
    type Waste = 'Dry' | 'Wet';
    const typeCount: {[key in Waste]:number}= {
        Dry:0,
        Wet: 0,
    }

    requests.forEach((req)=>{
        const type =   req.wasteType as Waste
        if(typeCount[type] !== undefined) typeCount[type]++;
    })

    return Object.entries(typeCount).map(([type,count])=>({
        type,
        count,
    }));
}
