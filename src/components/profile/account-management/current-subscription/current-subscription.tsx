import React from 'react';
import {Card, Typography} from "@/components";
import {useTranslation} from "@/hooks";
import s from './current-subscription.module.scss'
import {useCurrentSubscriptionsQuery} from "@/services/subscriptions";
import {format} from "date-fns";



export const CurrentSubscription = () => {

    const { t } = useTranslation()

    let dateNextPayment;
    let expireAtDate;
    const {data} = useCurrentSubscriptionsQuery()


    if(data){
        expireAtDate = format(new Date(data?.data[0].dateOfPayment),'dd/MM/yyyy')
        dateNextPayment= format(new Date(data?.data[data.data.length -1].endDateOfSubscription),'dd/MM/yyyy')
    }






    return (
        <>
            <Typography className={s.subtitle} variant="h3">
                {t.profile.currentSubscriptions}:
            </Typography>
            <Card className={s.cardContainer}>
                <div>
                    <p>{t.profile.expireAt}</p>
                     <p>{expireAtDate}</p>
                </div>
                <div>
                    <p>{t.profile.nextPayment}</p>
                    <p>{dateNextPayment}</p>
                </div>
            </Card>
        </>
    );
};

