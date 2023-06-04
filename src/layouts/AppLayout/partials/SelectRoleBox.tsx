import { Button, Divider, Select, Typography } from "antd";
import { BellOutlined } from "@ant-design/icons";

function SelectRoleBox() {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="px-2">
      <Typography.Title level={5}>Context</Typography.Title>
      <Select
        defaultValue="Admin"
        onChange={handleChange}
        options={[
          {
            label: "Manager",
            options: [{ label: "Admin", value: "Admin" }],
          },
          {
            label: "Hotels",
            options: [
              { label: "Chloe Hotel", value: "Chloe Hotel" },
              { label: "Dieu Hotel", value: "Dieu Hotel" },
            ],
          },
        ]}
        className="w-full "
        showSearch
      />
      <Divider className="my-3" />
    </div>
  );
}

export default SelectRoleBox;
