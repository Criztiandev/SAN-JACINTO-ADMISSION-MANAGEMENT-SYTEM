import { Typography, Radio } from "../../components";
import useRadioSelect from "../../hooks/userRadioSelect";
import { ItemSelection } from "../../interface/registrationInterface";

const categoryList: ItemSelection[] = [
  { cover: "null", title: "Casual", subtitle: "Regular Schedule" },
  { cover: "null", title: "Examination", subtitle: "Eg. Entrance, Final" },
  { cover: "null", title: "Events", subtitle: "Eg. Buwan ng Wika, " },
];

const CategorySelect = () => {
  const { data, currentSelectedIndex, handleSelectItem } =
    useRadioSelect(categoryList);

  return (
    <section>
      <Typography as="h5" className="mb-4 border-b border-gray-300 pb-2">
        Category
      </Typography>
      <Radio.Select.Group className="p-4 grid grid-cols-[repeat(3,1fr)] gap-4 overflow-x-auto">
        {data.map((category, index) => (
          <Radio.Select.Item
            key={category.title}
            className={`flex flex-col gap-4 justify-center items-center w-[175px] h-[200px] border  rounded-[5px] ${
              currentSelectedIndex === index
                ? "opacity-100 border-red-900 border-2"
                : "opacity-50 border-gray-300"
            }`}
            name="category"
            id={category.title}
            value={category.title}
            onClick={() => handleSelectItem(index)}>
            <div className="w-[64px] h-[64px] rounded-full bg-gray-300"></div>

            <div className="text-center">
              <Typography as="h6">{category.title}</Typography>
              <Typography as="p">{category.subtitle}</Typography>
            </div>
          </Radio.Select.Item>
        ))}
      </Radio.Select.Group>
    </section>
  );
};

export default CategorySelect;
