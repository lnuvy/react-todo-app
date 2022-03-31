import { db } from "../../firebase";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
  limit,
  startAfter,
  setDoc,
} from "firebase/firestore";

// Actions
const LOAD = "bucket/LOAD";
const LOAD_MORE = "bucket/LOAD_MORE";
const CREATE = "bucket/CREATE";
const DONE = "bucket/DONE";
const UPDATE = "bucket/UPDATE";
const DELETE = "bucket/DELETE";

const initialState = {
  list: [
    { id: "1648140099247", text: "영화관 가기", completed: false },
    { id: "1648140099245", text: "도서관 가기", completed: false },
    { id: "1648140099243", text: "수영 배우기", completed: false },
    { id: "1648140099241", text: "코딩때리기", completed: true },
  ],
  // 무한 스크롤 시 필요한 데이터
  lastList: 0,
};

// Action Creators
export const loadBucket = (bucket, lastList) => {
  return { type: LOAD, bucket, lastList };
};

export function createBucket(bucket) {
  return { type: CREATE, bucket };
}

export function doneBucket(id) {
  return { type: DONE, id };
}

export function updateBucket(id) {
  return { type: UPDATE, id };
}

export function deleteBucket(id) {
  return { type: DELETE, id };
}

// middlewares
const bucket_db = collection(db, "bucket");

export const loadBucketFB = () => {
  return async (dispatch) => {
    let bucket_list = [];
    let lastList = 0;

    // const q = query(bucket_db, orderBy("id"), limit(4));
    const querySnapshot = await getDocs(bucket_db);
    querySnapshot.forEach((doc) => {
      bucket_list = [...bucket_list, { ...doc.data() }];
    });
    dispatch(loadBucket(bucket_list), lastList);
  };
};

export const AddBucketFB = (data) => {
  return async (dispatch) => {
    // const docRef = await addDoc(collection(db, "bucket"), {
    //   ...data,
    //   completed: false,
    // });
    // const _data = await getDoc(docRef);
    // const bucket = { ..._data.data() };
    // console.log(bucket);
    // dispatch(createBucket(bucket));
    const _data = { ...data, completed: false };
    await setDoc(doc(bucket_db, data.id), _data);
    dispatch(createBucket(_data));
    // console.log(_data);
  };
};

export const doneBucketFB = (id) => {
  return async (dispatch) => {
    // const
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/LOAD": {
      return { list: action.bucket, lastList: action.lastList };
    }
    case "bucket/CREATE": {
      const new_bucket_list = [
        ...state.list,
        {
          id: action.bucket.id,
          text: action.bucket.text,
          completed: action.bucket.completed,
        },
      ];
      return { list: new_bucket_list };
    }
    case "bucket/DONE": {
      const new_bucket = state.list.map((l) => {
        if (action.id === l.id) {
          return { ...l, completed: true };
        } else {
          return l;
        }
      });
      return { list: new_bucket };
    }

    case "bucket/UPDATE": {
      const new_bucket = state.list.map((l) => {
        if (action.id === l.id) {
          return { ...l /* 여기 추가해야함 */ };
        } else {
          return l;
        }
      });
      return { list: new_bucket };
    }

    case "bucket/DELETE": {
      const new_bucket = state.list.filter((l) => {
        return action.id !== l.id;
      });
      return { list: new_bucket };
    }
    default:
      return state;
  }
}
