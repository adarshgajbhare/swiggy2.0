import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

const About = () => {
  return (
    <div className="min-h-dvh overflow-auto bg-black text-white">
      <div className="mt-28 flex items-center justify-center">
        <img
          className="h-[200px] w-[200px] rounded-full border-4 border-orange-500 hover:border-orange-700"
          src="https://t4.ftcdn.net/jpg/03/10/14/71/360_F_310147159_YbbmrcZ0GhdoGfSM6tNMpeJZDHt05UqU.jpg"
          alt=""
          srcSet=""
        />
      </div>
      <div className="mt-3 flex items-center justify-center text-3xl font-bold">
        <a
          className="hover:text-orange-500 hover:underline"
          href="http://www.github.com/adarshgajbhare "
          target="_blank"
        >
          <h1 className="mb-4 mt-4 text-2xl text-white hover:text-orange-500 hover:underline md:text-5xl">
            {" "}
            Adarsh Gajbhare
          </h1>
        </a>
      </div>

      <div className="mt-3 flex items-center justify-center font-bold">
        <h3 className="mb-1 mt-4 w-[30rem] flex-wrap items-center justify-center text-center text-xl italic md:text-2xl">
          Passionate Full-Stack Developer Coding enthusiast. I love exploring in
          variety of domains like React Js | Next Js | JavaScript | Java |
          Databases
        </h3>
      </div>
      <div class="mb-6 mt-10 flex items-center justify-center gap-x-5">
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
