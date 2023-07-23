export default function Font({ params }: { params: { font: string } }) {
  return <em className="text-center">{params.font}</em>;
}
