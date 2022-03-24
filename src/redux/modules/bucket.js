// widgets.js

// Actions
const CREATE = "bucket/CREATE";
const UPDATE = "bucket/UPDATE";
const DELETE = "bucket/DELETE";

const initialState = {
  list: [
    { text: "영화관 가기", completed: false },
    { text: "도서관 가기", completed: false },
    { text: "수영 배우기", completed: false },
    { text: "코딩때리기", completed: false },
  ],
  // list: ["영화관 가기크크루삥뽕", "매일 책읽기", "수영 배우기", "코딩때리기"],
};

// Action Creators

export function createBucket(bucket) {
  return { type: CREATE, bucket };
}

export function updateBucket(index) {
  return { type: UPDATE, index };
}

export function deleteBucket(index) {
  return { type: DELETE, index };
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/CREATE": {
      const new_bucket_list = [
        ...state.list,
        { text: action.bucket, completed: false },
      ];
      return { list: new_bucket_list };
    }
    case "bucket/UPDATE": {
      const new_bucket = state.list.map((l, i) => {
        if (parseInt(action.index) === i) {
          return { ...l, completed: true };
        } else {
          return l;
        }
      });
      return { list: new_bucket };
    }

    case "bucket/DELETE": {
      const new_bucket = state.list.filter((l, i) => {
        return action.index !== i;
      });
      return { list: new_bucket };
    }
    default:
      return state;
  }
}
