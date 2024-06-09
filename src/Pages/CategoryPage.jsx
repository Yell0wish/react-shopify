import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "../Components/BottomNavBar";
import '../CSS/CategoryPage.css'; // 导入CSS文件进行样式调整
import { SideBar } from 'antd-mobile';
import { getCategoryList } from "../Utils/CategoryUtils";
import categoryService from "../Services/CategoryService";

export default function CategoryPage() {
    const categories = getCategoryList()
    const [selectedCategory, setSelectedCategory] = useState();
    const navigate = useNavigate();
    
    const handleSubcategoryClick = (subcategory_id) => {
        categoryService.setCurrentSubcategoryId(subcategory_id)
        categoryService.setCurrentCategoryId(selectedCategory.id)
        
        navigate(`/subcategory/${subcategory_id}`);
    };
    useEffect(() => {
        const selectedCategoryId = categoryService.getCurrentCategoryId()
        console.log(selectedCategoryId)
        for(let category of categoryService.getList()) {
            if (category.id === selectedCategoryId) {
                setSelectedCategory(category)
                break
            }

        }
    }, []);
    
    useEffect(() => {
        if (selectedCategory) {
            categoryService.setCurrentCategoryId(selectedCategory.id);
        }
    }, [selectedCategory]);
    // 空依赖数组表示仅在组件挂载时执行
    // useEffect(()=>{
    //     categoryService.setCurrentCategoryId(selectedCategory.id)
    //     console.log(categoryService.getCurrentCategoryId())
    // }, [selectedCategory])
    return (
        <div className="category-page">
            <div className="left-panel">
                <SideBar
                    activeKey={selectedCategory?selectedCategory.name:""}
                    onChange={ (key) => {
                            setSelectedCategory(categories.find(category => category.name === key))
                        }
                    }
                >
                    {categories.map((category) => (
                        <SideBar.Item key={category.name} title={category.name} />
                    ))}
                </SideBar>
            </div>
            <div className="right-panel">
                <div className="subcategory-grid">
                    {selectedCategory?.subcategories.map((subcategory, index) => (
                        <div key={index} className="subcategory-item" onClick={() => handleSubcategoryClick(subcategory.subcategory_id)}>
                            <img src={subcategory.icon} alt={subcategory.name} className="subcategory-image" />
                            <span>{subcategory.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <BottomNavBar />
        </div>
    );
}
