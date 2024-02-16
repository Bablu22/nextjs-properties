const GetTitle = (title: string) => {
  return (
    <div>
      <h1 className="text-lg text-gray-700 capitalize">{title}</h1>
      <hr className="border-b border-gray-300 my-2" />
    </div>
  );
};

export default GetTitle;
