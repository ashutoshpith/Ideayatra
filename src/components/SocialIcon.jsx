const SocialIcon = ({ icon = "", link = "" }) => {
  const Icon = icon;
  return (
    <div className="flex justify-center w-10 p-2 rounded-md bg-[#F48C06]">
      <a href={link} target="_blank">
        <Icon />
      </a>
    </div>
  );
};
export default SocialIcon;
