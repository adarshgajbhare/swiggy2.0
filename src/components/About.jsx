const About = () => {
  return (
    <div className=" ">
      <div className="flex justify-center items-center">
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
          target="_blank"
        >
         <h1 className=" text-2xl md:text-5xl mb-4 mt-4 text-black hover:text-orange-500 hover:underline"> Adarsh Gajbhare</h1>
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
          <img
            width="64"
            height="64"
            src="https://img.icons8.com/glyph-neue/64/github.png"
            alt="github"
            class="h-[3rem] w-[3rem]"
          />
        </a>
        <a href="https://www.linkedin.com/in/adarshgajbhare/" target="_blank">
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/fluency/48/linkedin.png"
            alt="linkedin"
            class="h-[3rem] w-[3rem]"
          />
        </a>
      </div>
    </div>
  );
};

export default About;
