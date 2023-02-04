import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilters, setCategoryId } from '../redux/slices/filterSlice';


const Categories: React.FC = React.memo( () => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const { categoryId } = useSelector(selectFilters);
  const dispatch = useDispatch();

  const onChangeCategory = React.useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)}
            className={categoryId === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
