interface Props {
  name: string;
  value: string;
}
const GetDetails = ({ name, value }: Props) => {
  return (
    <div className="flex justify-between items-center m-0">
      <p className="text-sm text-gra-600 capitalize m-0 leading-loose ">
        {name}
      </p>
      <p className="text-sm text-gra-600 capitalize m-0 leading-loose ">
        {value}
      </p>
    </div>
  );
};

export default GetDetails;
