import React, {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import MenuBar from "../components/MenuBar";
import {DatePicker, Input, Button} from "antd";
import {
    PlusOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import ruRU from "antd/es/date-picker/locale/ru_RU";
import moment from "moment";
import "moment/locale/ru";

moment.locale("ru");

const inputVariants = {
    open: {width: "300px", opacity: 1, display: "flex"},
    closed: {width: "0", opacity: 0, display: "none"},
};

export const TodoListsPage = () => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [showCategoryInput, setShowCategoryInput] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    const handleDatePickerOpenChange = (open) => {
        setIsDatePickerOpen(open);
    };

    const handleCategoryInputChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleCategoryInputToggle = () => {
        setShowCategoryInput(!showCategoryInput);
    };

    const handleCategoryInputClose = () => {
        setCategoryName("");
        setShowCategoryInput(false);
    };

    const handleAddCategory = () => {
        if (categoryName.trim() !== "") {
            console.log("Название категории:", categoryName);
            setCategoryName("");
            setShowCategoryInput(false);
        }
    };

    return (
        <div>
            <MenuBar/>
            <div style={{position: "absolute", top: "80px", right: "16px"}}>
                <DatePicker
                    locale={ruRU}
                    format="DD.MM.YYYY"
                    picker="date"
                    open={isDatePickerOpen}
                    onOpenChange={handleDatePickerOpenChange}
                />
            </div>
            <div
                style={{
                    position: "absolute",
                    top: "120px",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            >
                <AnimatePresence>
                    {showCategoryInput && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={inputVariants}
                            transition={{duration: 0.3}}
                            style={{
                                alignItems: "center",
                                marginBottom: "16px",
                                width: "300px",
                            }}
                        >
                            <Input
                                style={{flex: 1, marginRight: "8px"}}
                                placeholder="Введите название категории"
                                value={categoryName}
                                onChange={handleCategoryInputChange}
                            />
                            <Button
                                type="primary"
                                icon={<PlusOutlined/>}
                                style={{flex: 0, paddingRight: '6px', paddingLeft: '6px', backgroundColor: '#333232'}}
                                onClick={handleAddCategory}
                            />
                            <Button
                                style={{marginLeft: "8px", flex: 0, paddingRight: '6px', paddingLeft: '6px'}}
                                icon={<CloseOutlined/>}
                                onClick={handleCategoryInputClose}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                {!showCategoryInput && (
                    <Button
                        type="dashed"
                        icon={<PlusOutlined/>}
                        onClick={handleCategoryInputToggle}
                        style={{display: showCategoryInput ? "none" : "inline-block"}}
                    />
                )}
            </div>
        </div>
    );
};

export default TodoListsPage;
