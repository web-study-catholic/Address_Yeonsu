import Select from "react-select";
import { map } from "../constants/map";
import {
  setSido,
  setSigugun,
  setDong,
} from "../action/mapAddressAction"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducer/rootReducer";


const MapSelector= ({onSelect}: { onSelect: (sido: string, sigugun: string, dong: string) => void }) => {
  const { sido, sigugun, dong } = useSelector((state:RootState) => state.address);
  const dispatch = useDispatch();
  

  const sidoArray = map.sido;
  const sigugunArray = map.sigugun
  .filter((item) => item.link === sido)
  .map((item) => ({value : item.value, label: item.label}));
  const dongArray = map.dong
  .filter((item) => item.sido === sido && item.sigugun === sigugun)
  .map((item) => ({ value: item.value, label: item.label}));

  const address = `${sido} ${sigugun} ${dong}`;
  console.log(address);

  const sidoHandler = (selectedSido: any) => {
    dispatch(setSido(selectedSido.value));
    onSelect(selectedSido.value, sigugun, dong);
  };
  const sigugunHandler = (selectedSigugun:any) => {
    dispatch(setSigugun(selectedSigugun.value));
    onSelect(sido, selectedSigugun.value, dong);
  };
  const dongHandler = (selectedDong: any) => {
    dispatch(setDong(selectedDong.value));
    onSelect(sido, sigugun, selectedDong.value);
  };
  return (
    <>
      <Select
        onChange={sidoHandler}
        options={sidoArray}
        placeholder="시/도 선택"
        value={sidoArray.find((option) => option.value === sido)}
      />
      <Select
        onChange={sigugunHandler}
        options={sigugunArray}
        placeholder="시/군/구 선택"
        value={sigugunArray.find(
          (option) => option.value === sigugun
        )}
      />
      <Select
        onChange={dongHandler}
        options={dongArray}
        placeholder="읍/면/동 선택"
        value={dongArray.find(
          (option) => option.value === dong
        )}
      />
    </>
  );
};

export default MapSelector;
