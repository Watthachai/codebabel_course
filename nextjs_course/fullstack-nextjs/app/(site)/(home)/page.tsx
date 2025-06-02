import Image from 'next/image';

const HomePage = () => {
  return (
    <>
      <h1 className="my-4 text-center text-4xl font-bold">
        Absence Management
      </h1>
      <div className="relative h-[500px]">
        <Image
          src="/assets/images/absence-management.jpg"
          alt="Home Page"
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
          className="object-cover"
        ></Image>
      </div>
    </>
  );
};

export default HomePage;
