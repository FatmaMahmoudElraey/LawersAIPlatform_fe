'use client';

import Image from 'next/image';
import { Spinner } from '../ui/spinner';
import { motion } from 'motion/react';
import { Button } from '../ui/button';

interface IEmptyResultProps {
  imageUrl: any;
  message: string;
  extraInfo?: string;
  alt?: string;
  button?: { onClick: () => void; content?: string };
}

function EmptyResult({
  alt,
  message,
  imageUrl,
  extraInfo,
  button,
}: IEmptyResultProps) {
  return (
    <motion.div
      initial={{ scaleX: 0, scaleY: 0 }}
      animate={{ scaleX: 1, scaleY: 1 }}
      transition={{ type: 'spring' }}
      className="absolute left-[40%] top-[30%] translate-x-[-50%] translate-y-[-50%] max-w-[200px]"
    >
      <div className="flex flex-col gap-4 items-center justify-center">
        <Image
          alt={alt ?? 'image'}
          src={imageUrl}
          className="mx-auto mt-6 h-[180px] w-[180px]"
        />
        <p className="text-nowrap text-2xl">{message}</p>
        {extraInfo && (
          <p className="text-nowrap text-center text-lg">{`(${extraInfo})`}</p>
        )}
        <Button className="rounded-full" onClick={button?.onClick}>
          {button?.content ?? 'Refresh'}
        </Button>
      </div>
    </motion.div>
  );
}

export default EmptyResult;
