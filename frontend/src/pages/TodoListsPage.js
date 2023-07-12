import React, {useEffect, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import MenuBar from "../components/MenuBar";
import {DatePicker, Input, Button, Form} from "antd";
import {
    PlusOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import ruRU from "antd/es/date-picker/locale/ru_RU";
import moment from "moment";
import "moment/locale/ru";
import CategoryCard from "../components/CategoryCard";
import CategoryService from "../services/categoryService";
import {useDispatch} from "react-redux";

moment.locale("ru");

const inputVariants = {
    open: {width: "800px", opacity: 1, display: "flex"},
    closed: {width: "0", opacity: 0, display: "none"},
};

export const TodoListsPage = () => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [showCategoryInput, setShowCategoryInput] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        CategoryService.getCategories()
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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

    const onFinish = () => {
        if (categoryName.trim() !== "") {
            const newCategory = {title: categoryName, id: categories.length + 1};
            setCategories([...categories, newCategory]);
            setCategoryName("");
            setShowCategoryInput(false);
        }

        CategoryService.createCategory(categoryName, dispatch)
            .then(() => {
                form.resetFields();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleEditCategory = (categoryId, newTitle) => {
        const updatedCategories = categories.map((category) => {
            if (category.id === categoryId) {
                return {...category, title: newTitle};
            }
            return category;
        });
        setCategories(updatedCategories);
    };

    const handleAddTask = (categoryId) => {
        console.log("Добавление задачи в категорию:", categoryId);
    };

    return (
        <Form form={form} onFinish={onFinish}>
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
                                    marginBottom: "32px",
                                    width: "800px",
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
                                    style={{
                                        flex: 0,
                                        paddingRight: "6px",
                                        paddingLeft: "6px",
                                        backgroundColor: "#333232",
                                    }}
                                    htmlType="submit"
                                />
                                <Button
                                    style={{
                                        marginLeft: "8px",
                                        flex: 0,
                                        paddingRight: "6px",
                                        paddingLeft: "6px"
                                    }}
                                    icon={<CloseOutlined/>}
                                    onClick={handleCategoryInputClose}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div style={{textAlign: "center"}}>
                        {!showCategoryInput && (
                            <Button
                                type="dashed"
                                icon={<PlusOutlined/>}
                                onClick={handleCategoryInputToggle}
                                style={{display: showCategoryInput ? "none" : "inline-block"}}
                            />
                        )}
                    </div>
                    <div style={{marginTop: "30px"}}>
                        {categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                handleEditCategory={handleEditCategory}
                                handleAddTask={handleAddTask}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default TodoListsPage;
