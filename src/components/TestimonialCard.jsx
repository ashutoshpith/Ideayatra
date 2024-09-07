import Image from "next/image";

const TestimonialCard = (props) => {
  const { name = "", title = "", image = "", description = "" } = props;

  return (
    <section className="bg-white border rounded-md h-[250px] p-5">
      <div className="flex flex-col gap-2">
        <p className="font-bold">{title}</p>

        <div className="max-h-[150px] ellipsis text-sm">{description}</div>
        <h1>{name}</h1>
      </div>
    </section>
  );
};
export default TestimonialCard;
