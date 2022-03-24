// widgets.js

// Actions
const CREATE = "bucket/CREATE";
const UPDATE = "bucket/UPDATE";
const DELETE = "bucket/DELETE";

// completed: "notYet" (아직 하지못함), "doneCheck"/"deleteCheck" (유저가 수정중인상태), "done" (끝냄)
const initialState = {
  list: [
    { id: "1648140099247", text: "영화관 가기", completed: false },
    { id: "1648140099245", text: "도서관 가기", completed: false },
    { id: "1648140099243", text: "수영 배우기", completed: false },
    { id: "1648140099241", text: "코딩때리기", completed: true },
  ],
  // list: ["영화관 가기크크루삥뽕", "매일 책읽기", "수영 배우기", "코딩때리기"],
};

// Action Creators

export function createBucket(bucket) {
  return { type: CREATE, bucket };
}

export function updateBucket(id) {
  return { type: UPDATE, id };
}

export function deleteBucket(id) {
  return { type: DELETE, id };
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/CREATE": {
      const new_bucket_list = [
        ...state.list,
        {
          id: new Date().getTime() + "",
          text: action.bucket,
          completed: false,
        },
      ];
      return { list: new_bucket_list };
    }
    case "bucket/UPDATE": {
      const new_bucket = state.list.map((l) => {
        if (action.id === l.id) {
          return { ...l, completed: true };
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
