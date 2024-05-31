import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

const About = () => {
  return (
    <div className=" bg-black min-h-dvh text-white overflow-auto ">
      <div className="flex justify-center items-center mt-28">
        <img
          className="h-[200px] w-[200px] rounded-full border-orange-500 border-4 hover:border-orange-700 "
          src="https://t4.ftcdn.net/jpg/03/10/14/71/360_F_310147159_YbbmrcZ0GhdoGfSM6tNMpeJZDHt05UqU.jpg"
          alt=""
          srcSet=""
        />
      </div>
      <div className="flex justify-center items-center mt-3 font-bold text-3xl">
        <a
          className=" hover:underline hover:text-orange-500"
          href="http://www.github.com/adarshgajbhare "
          target="_blank">
          <h1 className=" text-2xl md:text-5xl mb-4 mt-4 text-white hover:text-orange-500 hover:underline">
            {" "}
            Adarsh Gajbhare
          </h1>
        </a>
      </div>

      <div className="flex justify-center items-center mt-3 font-bold ">
        <h3 className=" mt-4 mb-1 text-xl md:text-2xl italic flex-wrap w-[30rem] items-center justify-center text-center ">
          Passionate Full-Stack Developer Coding enthusiast. I love exploring in
          variety of domains like React Js | Next Js | JavaScript | Java |
          Databases
        </h3>
      </div>
      <div class="flex gap-x-5 mt-10 justify-center items-center mb-6">
        <a href="https://github.com/adarshgajbhare" target="_blank">
          <IconBrandGithub strokeWidth={2} size={30} />
        </a>
        <a href="https://www.linkedin.com/in/adarshgajbhare/" target="_blank">
          <IconBrandLinkedin strokeWidth={2} size={30} />
        </a>
      </div>
    </div>
  );
};

export default About;
