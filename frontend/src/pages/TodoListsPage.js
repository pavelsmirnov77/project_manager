import React, {useEffect, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import MenuBar from "../components/MenuBar";
import {DatePicker, Input, Button, Form, Empty, message} from "antd";
import {
    PlusOutlined,
    CloseOutlined, AppstoreAddOutlined,
} from "@ant-design/icons";
import ruRU from "antd/es/date-picker/locale/ru_RU";
import moment from "moment";
import "moment/locale/ru";
import taskService from "../services/taskService";
import CategoryCard from "../components/CategoryCard";
import CategoryService from "../services/categoryService";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import categoryService from "../services/categoryService";
import Clock from "../components/Clock";
import Calendar from "../components/Calendar";

moment.locale("ru");

const inputVariants = {
    open: {width: "850px", opacity: 1, display: "flex"},
    closed: {width: "0", opacity: 0, display: "none"},
};

export const TodoListsPage = () => {
    const {id} = useParams();
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [showCategoryInput, setShowCategoryInput] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [setCategories] = useState([]);
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const [form] = Form.useForm();
    const selectedCategory = useSelector((state) => state.categories.selectedCategory);
    const categoriesIds = categories.map((category) => category.id);

    useEffect(() => {
        if (selectedCategory && categoriesIds.includes(selectedCategory.id)) {
            taskService.getTasksFromCategory(id, dispatch);
        }
    }, [selectedCategory]);


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

    const setCategory = (id) => {
        categoryService.selectCategory(id, dispatch)
    }

    const handleCreateCategory = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const currentUserId = user ? user.id : null;
        if (currentUserId) {
            const newCategory = {
                name: categoryName,
                id: categories.length + 1,
                user: {id: currentUserId}};
            CategoryService.createCategory(newCategory, dispatch).then(() => {
                message.success(`Категория "${newCategory.name}" успешно создана!`)
                CategoryService.getCategories(dispatch);
            })
        }
    };

    useEffect(() => {
        categoryService.getCategories(dispatch)
    }, []);

    const handleEditCategory = (categoryId, newTitle) => {
        const updatedCategories = categories.map((category) => {
            if (category.id === categoryId) {
                return {...category, title: newTitle};
            }
            return category;
        });
        setCategory(updatedCategories);
    };

    const handleAddTask = (categoryId) => {
        console.log("Добавление задачи в категорию:", categoryId);
    };

    return (
        <Form form={form} onFinish={handleCreateCategory}>
            <div>
                <MenuBar/>
                <div style={{position: "absolute", top: "80px", right: "16px"}}>
                    <Clock/>
                    <Calendar/>
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
                    {categories.length === 0 ? (
                        <Empty style={{marginTop: "150px"}}
                               image={<AppstoreAddOutlined style={{fontSize: 64, color: "rgba(0, 0, 0, 0.5)"}}/>}
                               description={<span
                                   style={{color: "rgba(0, 0, 0, 0.5)", fontSize: 20}}>Список задач пуст</span>}
                        />
                    ) : (
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
                    )}
                </div>
            </div>
        </Form>
    );
};

export default TodoListsPage;
