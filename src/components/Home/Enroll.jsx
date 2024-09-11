import EnrollForm from './EnrollForm'
import Image from 'next/image'

export default function EnrollSection() {
  const imagePath = "/landingPage/enroll_girl.png"
    return (
        <>
        <div className="w-full h-[80px] md:h-[180px] bg-[url('../../public/landingPage/enrollBackground.png')] bg-no-repeat mt-16"></div>
        <div className="bg-white ">
  <div className="container mx-auto px-4 flex items-center h-[calc(100vh-10rem)]">
    <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8 w-full h-full">
      {/* Form Container */}
      <div className="w-full md:w-1/2 max-w-md mx-4 md:mx-24 overflow-y-auto h-full py-6">
        <EnrollForm />
      </div>

      {/* Image Container */}
      <div className="w-full md:w-1/2 h-full flex" >
        <div className="relative w-full h-full">
          <Image
            src="/landingPage/enroll_girl.png"
            alt="Enroll Girl"
            layout="fill"
            objectFit="cover"
            objectPosition="center right"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  </div>
</div>

        </>
    )
}