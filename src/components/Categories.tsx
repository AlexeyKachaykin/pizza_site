type CategoriesProps = {
  value: number;
  onChangeCategory: (i:number)=>void;
}
  
const Categories: React.FC<CategoriesProps>= ({ value, onChangeCategory }) =>
 {
  
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const onClickCategory = (index:number) => {
    onChangeCategory(index);
  }
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Categories;



