import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import Select from "react-select";

export const CustomInput = ({
  inputName,
  inputText,
  value,
  type,
  _isRequired,
  size,
  placeholder = "",
  handleChange,
  defaultValue = "",
}) => (
  <FormControl id={inputName} isRequired={_isRequired}>
    <FormLabel>{inputText}</FormLabel>
    <Input
      borderColor="gray.500"
      borderRadius="3px"
      type={type}
      name={inputName}
      value={value}
      onChange={handleChange}
      size={size}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  </FormControl>
);

export const CustomSelect = ({
  id,
  label,
  value,
  ref,
  options,
  isRequired_,
  placeholder,
  handleChange,
  defaultValue = "",
}) => (
  <FormControl id={id} isRequired={isRequired_}>
    <FormLabel>{label}</FormLabel>
    <Select
      name={id}
      defaultValue={defaultValue}
      defaultInputValue=""
      ref={ref}
      placeholder={placeholder}
      onChange={(e) => handleChange({ target: { value: e.value, name: id } })}
      options={options}
    ></Select>
    <input
      style={{
        opacity: "0",
        top: "-15px",
        left: "100px",
        position: "relative",
        width: "1px",
        height: "1px",
        display: "block",
      }}
      name={id}
      id={id}
      type="text"
      value={value}
      required={isRequired_}
    />
  </FormControl>
);

export const Seperator = ({ bg = "gray" }) => (
  <Box rounded={3} w="100%" h="1px" bg={bg}></Box>
);
