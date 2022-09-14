import Link from 'next/link';
import React from 'react'
import { LoadingSvg } from '../../assets/svg/LoadingSvg';
import { SuccessSvg } from '../../assets/svg/SuccessSvg';
import { WarningSvg } from '../../assets/svg/WarningSvg';
import { NEW_EVENT_ROUTE } from '../../constants/routes';
import { TxnStatusType, useWalletCxt } from '../../providers/WagmiProvider'
import { BtnTypes } from '../../utils/btnTypeClasses';
import { Txn } from '../layout/Txn';
import Button from './Button';


export const TxnModal = ({ title, href }: { title: string, href: string }) => {
  const { TxnStatus } = useWalletCxt();
  return (
    <Txn>
      {TxnStatus === TxnStatusType.AWAITING_CONFIRMATION && (
        <>
          <LoadingSvg />
          <p className="text-lg text-antiqueBlue-900">Please confirm the transaction from you wallet to continue ...</p>
        </>
      )}
      {TxnStatus === TxnStatusType.PENDING && (
        <>
          <LoadingSvg />
          <p className="text-lg text-antiqueBlue-900">Loading ...</p>
        </>
      )}
      {TxnStatus === TxnStatusType.DONE && (
        <>
          <SuccessSvg />
          <h1 className="text-3xl tracking-tight font-extrabold text-antiqueBlue-800 sm:text-4xl mb-4">Success!</h1>
          <h2 className="text-antiqueBlue-700 mb-4">{title}</h2>

          <Link href={href} passHref>
            <Button btnType={BtnTypes.SUBMIT}>
              Go!
            </Button>
          </Link>
        </>
      )}
      {TxnStatus === TxnStatusType.REJECTED && (
        <>
          <WarningSvg />
          <h1 className="text-3xl tracking-tight font-extrabold text-antiqueBlue-800 sm:text-4xl mb-4">Rejected!</h1>
          <h2 className="text-antiqueBlue-700 mb-4">You have rejected the transaction, in order to continue you must accept it from your wallet</h2>

          <Link href={NEW_EVENT_ROUTE} passHref>
            <Button btnType={BtnTypes.OUTLINE}>
              Ok
            </Button>
          </Link>
        </>
      )}
      {TxnStatus === TxnStatusType.ERROR && (
        <>
          <WarningSvg />
          <h1 className="text-3xl tracking-tight font-extrabold text-antiqueBlue-800 sm:text-4xl mb-4">Error!</h1>
          <h2 className="text-antiqueBlue-700 mb-4">An error has occurred, please try again and if the error persists contact the administrator</h2>

          <Link href={NEW_EVENT_ROUTE} passHref>
            <Button btnType={BtnTypes.OUTLINE}>
              Ok
            </Button>
          </Link>
        </>
      )}
    </Txn>
  )
}


