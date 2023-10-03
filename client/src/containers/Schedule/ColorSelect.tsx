import { useState } from "react";
import { Typography, Radio } from "../../components";

const colors: Array<string> = [
  "#FF7777",
  "#9390FF",
  "#FFBC58",
  "#9DFF9B",
  "#FF80E3",
  "#00D5C8",
];

const ColorSelect = () => {
  const [colorSelected, setColorSelected] = useState<number>(-1);
  return (
    <section>
      <Typography as="h5" className="mb-4 border-b border-gray-300 pb-2">
        Colors
      </Typography>
      <Radio.Select.Group className="flex justify-between items-center">
        {colors.map((color, index) => (
          <Radio.Select.Item
            key={color}
            name="color"
            value={color}
            className={`cursor-pointer ${
              colorSelected === index ? "opacity-100" : "opacity-20"
            }`}
            onClick={() => setColorSelected(index)}>
            <div
              className="p-4 rounded-full"
              style={{ backgroundColor: `${color}` }}></div>
          </Radio.Select.Item>
        ))}
      </Radio.Select.Group>
    </section>
  );
};

export default ColorSelect;
