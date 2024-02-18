import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import FilterGalleryContext from '../../contexts/filter-gallery-context/FilterGalleryContext';
import filterList from '../../contexts/filter-gallery-context/filterList';
import './GalleryFilter.scss';

const GalleryFilter = () => {
  const { i18n, t } = useTranslation();

  // handle filter
  const { filteredList, setFilteredList } = useContext(FilterGalleryContext);

  useEffect(() => {
    let mapped = [];
    // eslint-disable-next-line no-unused-vars
    for (let _i of filterList(t)) {
      mapped = filteredList.map((li, index) => ({
        ...li,
        ...filterList(t)[index],
        selected: li.selected
      }));
    }

    setFilteredList(mapped);
  }, [i18n.language]);

  const handleFilterGallery = (id) => {
    // const filtered = galleryFilterList.filter(g => g.id === id);
    // setFilteredList(filtered);

    // add selected
    setFilteredList(
      filteredList.map((list) =>
        list.id === id
          ? { ...list, selected: true }
          : { ...list, selected: false }
      )
    );
  };

  const renderGalleryFilter = () =>
    filteredList.map(({ id, name, selected }) => (
      <li
        className={`filter-btn ${selected ? 'selected' : ''}`}
        key={id}
        onClick={() => handleFilterGallery(id)}
      >
        <span>{name}</span>
      </li>
    ));

  return <ul className="gallery-filter-list">{renderGalleryFilter()}</ul>;
};

export default GalleryFilter;
