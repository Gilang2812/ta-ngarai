import Image from "next/image"

export const WelcomeSection = ()=>{
    return   <aside className="relative inset-0 font-quicksand col-span-1 z-10">
    <Image
      src='/images/bg-header.jpg'
      alt="bg"
      layout="responsive"
      width={700}
      height={475}
      className="w-full bg-cover h-auto"
    />
    <div className="absolute capitalize leading-relaxed text-5xl inset-0 p-8 pt-12 bg-black/70 text-white font-extrabold flex flex-col justify-center items-start">
      <h2>Welcome to </h2>
      <h1 className="text-7xl">Desa Wisata Nagari Koto Gadang</h1>
    </div>
  </aside>
}