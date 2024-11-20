import React from 'react';
import Image from 'next/image';

interface NoResultsProps {
  textHeader: string;
}

const NoResults: React.FC<NoResultsProps> = ({ textHeader }) => {
  return (
    <div className="flex flex-col items-center mt-4 p-2" id="Notfound">
      <p className="text-[#674636] font-adlam text-xl m-2 text-center">{textHeader}</p>
      <Image
        src="/images/No-Result.png"
        alt="No result"
        width={200}
        height={200}
      />
    </div>
  );
};

export default NoResults;
