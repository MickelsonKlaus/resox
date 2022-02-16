export const initialState = {
    data: [],
    answers: [],
    earnings: 0
}

export const reducer = (state, action) => {
    switch (action.type) {
        case "update":
            let updates = [];
            state.data.forEach((item) => {
                if (item.id !== action.item.id) {
                    return updates.push(item);
                }
            });

            return {
                ...state,
                data: [...updates, action.item],
            };
        case "answers":
            let answerUpdate = [];
            state.answers.forEach((item) => {
                if (item.id !== action.item.id) {
                    return answerUpdate.push(item);
                }
            });

            return {
                ...state,
                answers: [...answerUpdate, action.item],
            };
        case "earnings":
            return {
                ...state,
                earnings: action.item
            }
        default:
            return { ...state }
    }
}