// import { useState } from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import styled from "styled-components";
import ItemList from "../components/Item/ItemList.js";
import SlideBanner from "../components/UI/SlideBanner.js";

const Main = (props) => {
  const portNum = 5000;
  const url = "http://" + window.location.hostname + ":" + portNum + "/";

  const [itemList, setItemList] = useState([]);
  const [initialList, setInitialList] = useState([]);

  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}items`);
        setItemList(response.data.data);
        setInitialList(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(false);

  const enterSearch = async (e) => {
    if (e.key === "Enter") {
      try {
        await axios
          .get(`${url}items?search=${search}`, {
            headers: {
              Authentication: `${sessionStorage.getItem("accessToken")}`,
            },
          })
          .then((res) => {
            setItemList(res.data.data);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSearch = async (e) => {
    try {
      await axios
        .get(`${url}items?search=${search}`, {
          headers: {
            Authentication: `${sessionStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          setItemList(res.data.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCategory = (e) => {
    if (e.target.checked) {
      const newCategory = [...category, e.target.value];
      setCategory(newCategory);
    } else {
      const newCategory = [...category];
      const result = newCategory.filter((el) => el !== e.target.value);
      setCategory(result);
    }
  };

  useEffect(() => {
    if (category.length !== 0) {
      const filterItems = itemList.filter((item) =>
        category.includes(item.itemCategory)
      );
      setItemList(filterItems);
      return;
    } else {
      setItemList(initialList);
    }
  }, [category]);

  useEffect(() => {
    if (checked) {
      const result = itemList.filter((item) => item.status === "inStock");
      setItemList(result);
    } else {
      setItemList(initialList);
    }
  }, [checked]);

  return (
    <MainBlock>
      <SearchBlock>
        <input
          type={"text"}
          placeholder="???????????????"
          onChange={handleChange}
          value={search}
          onKeyDown={enterSearch}
        ></input>
        <button type="button" onClick={handleSearch}>
          ??????
        </button>
      </SearchBlock>
      <FilterBlock>
        <StyleLegend
          onClick={() => {
            setVisible((preState) => !preState);
          }}
        >
          ?????? ???????????? ???
        </StyleLegend>

        {visible ? (
          <IndexBlock>
            <StyledLabel>
              <input
                type="checkbox"
                name="itemCategory"
                value="??????"
                checked={category.includes("??????")}
                onChange={handleCategory}
              ></input>
              ??????
            </StyledLabel>
            <StyledLabel>
              <input
                type="checkbox"
                name="itemCategory"
                value="??????"
                checked={category.includes("??????")}
                onChange={handleCategory}
              ></input>
              ??????
            </StyledLabel>
            <StyledLabel>
              <input
                type="checkbox"
                name="itemCategory"
                value="?????????"
                checked={category.includes("?????????")}
                onChange={handleCategory}
              ></input>
              ?????????
            </StyledLabel>
            <StyledLabel>
              <input
                type="checkbox"
                name="itemCategory"
                value="??????"
                checked={category.includes("??????")}
                onChange={handleCategory}
              ></input>
              ??????
            </StyledLabel>
            <StyledLabel>
              <input
                type="checkbox"
                name="itemCategory"
                value="??????"
                checked={category.includes("??????")}
                onChange={handleCategory}
              ></input>
              ??????
            </StyledLabel>
          </IndexBlock>
        ) : null}
      </FilterBlock>

      <SlideBanner></SlideBanner>
      <ItemBlock>
        <StyledDiv>
          <StyledLabel>
            <StyledInput
              type="checkbox"
              checked={checked}
              onChange={() => {
                setChecked((preState) => !preState);
              }}
            ></StyledInput>
            ??????????????? ??????
          </StyledLabel>
        </StyledDiv>
        <ItemList itemList={itemList}></ItemList>
      </ItemBlock>
    </MainBlock>
  );
};

export default Main;

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemBlock = styled.div`
  display: flex;
  margin: 30px auto;
  flex-direction: column;
`;

const SearchBlock = styled.div`
  display: flex;
  justify-content: center;

  margin: 30px;

  input {
    margin-left: 10px;
    height: 54px;
    width: 600px;
    font-size: 25px;
  }

  button {
    margin-left: 10px;
    width: 90px;
    font-size: 25px;
  }
`;

const FilterBlock = styled.fieldset`
  position: relative;
  border: none;
  width: 500px;
  margin: 0 auto;

  font-size: 20px;
`;

const IndexBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 90px;
  width: 350px;
  height: 100px;
  border: 2px solid rgba(0, 0, 0, 0.4);
  z-index: 10;
  background-color: white;
  border-radius: 40px;
`;

const StyleLegend = styled.legend`
  cursor: pointer;
  font-size: 25px;
  text-align: center;
`;

const StyledLabel = styled.label`
  & {
    margin-right: 10px;
  }
  font-size: 22px;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledInput = styled.input`
  margin-right: 20px;
  transform: scale(2);
`;
