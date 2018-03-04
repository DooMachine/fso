import * as addnewpost from '../actions/addnewpost';
import { PostPart } from '../../shared/models/postpart';
import { InterestCard } from '../../shared/models/interest/interestcard';
import { CollectionCard } from '../../shared/models/collection/collectioncard';
export interface AddPostState{
    title: string;
    content: string;
    privacyStatus: number;
    description: string;
    isPublished: boolean;
    postParts: Array<PostPart>;
    selectedInterestIds: Array<number>;
    collectionId: number;
    id: number;
}
export interface State {
    isLoading: boolean;
    isPostPartPending:boolean;
    formPending:boolean;
    error: string | null;
    post: AddPostState;    
    interests: Array<InterestCard>;
    collections: Array<CollectionCard>
    selectedInterests: Array<InterestCard>;
    autoCompleteInterestsLoading: boolean;
    isPostLoading:boolean;
};

export const initialState: State = {
    isLoading:false,
    isPostPartPending:false,
    error: null,        
    formPending:false,
    interests: [],
    collections:[],
    selectedInterests:[],
    autoCompleteInterestsLoading: false,
    isPostLoading: false,
    post:{
        title: '',
        content: '',
        privacyStatus: 0,
        description: '',
        isPublished: false,
        postParts: [],
        selectedInterestIds: [],
        collectionId: 0,
        id: 0
    }
};

export function reducer(state = initialState, action: addnewpost.AddNewPostActions ): State {
    switch (action.type) {
        case addnewpost.AddNewPostActionTypes.SUBMIT_FORM: {
            return {
                ...state,
                formPending:true
            };
        }
        case addnewpost.AddNewPostActionTypes.SUBMIT_FORM_SUCCESS: {
            return {
                ...state,
                formPending:false,
            };
        }
        case addnewpost.AddNewPostActionTypes.SUBMIT_FORM_FAIL: {
            return {
                ...state,
                formPending:false,
                error:action.payload.error
            };
        }
        case addnewpost.AddNewPostActionTypes.SHOW_ERROR: {
            return {
                ...state,
                error:action.payload,
            };
        }
        case addnewpost.AddNewPostActionTypes.SELECT_INTEREST: {
            const interestId = action.payload;
            const interest = state.interests.find((interest)=> interest.id == interestId);
            return {
                ...state,
                isLoading:true,
                selectedInterests: [...state.selectedInterests, interest]
            };
        }
        case addnewpost.AddNewPostActionTypes.DESELECT_INTEREST: {
            const interestId = action.payload;
            return {
                ...state,
                isLoading:true,
                selectedInterests: state.selectedInterests.filter((item) => { 
                    return item.id !== interestId
                })
            };
        }
        case addnewpost.AddNewPostActionTypes.GET_UNPUBLISHED_POST: {
            return {
                ...state,
                isPostLoading:true,
                isPostPartPending:true
            };
        }
        case addnewpost.AddNewPostActionTypes.GET_UNPUBLISHED_POST_SUCCESS: {
            return {
                ...state,
                isPostLoading:false,
                isPostPartPending:false,
                collections: action.payload.userCollections,
                post: {
                    ...state.post,
                    description:action.payload.description,
                    title:action.payload.title,
                    content: action.payload.content,
                    collectionId:action.payload.collectionId,
                    isPublished:action.payload.isPublished,
                    postParts: action.payload.postParts,
                    id: action.payload.id
                }
            };
        }
        case addnewpost.AddNewPostActionTypes.GET_UNPUBLISHED_POST_FAIL: {
            return {
                ...state,
                isPostLoading:false
            };
        }
        case addnewpost.AddNewPostActionTypes.GET_AUTOCOMPLETE_INTEREST: {
            return {
                ...state,
                autoCompleteInterestsLoading:true
            };
        }
        case addnewpost.AddNewPostActionTypes.GET_AUTOCOMPLETE_INTEREST_SUCCESS: {
            return {
                ...state,
                autoCompleteInterestsLoading:false,
                interests:action.payload
            };
        }
        case addnewpost.AddNewPostActionTypes.GET_AUTOCOMPLETE_INTEREST_FAIL: {
            return {
                ...state,
                autoCompleteInterestsLoading:false
            };
        }
        case addnewpost.AddNewPostActionTypes.ADD_POSTPART: {
            return {
                ...state,
                isLoading: true,
                isPostPartPending:true,
            };
        }
        case addnewpost.AddNewPostActionTypes.ADD_POSTPART_SUCCESS: {
            const newPostPart : PostPart = {
                id:action.payload.ret.postPartId,
                title: '',
                description: '',
                image: {                    
                    dimension:'',
                    extension:'',
                    lazyUrl:'',
                    smallUrl:'',
                    url:'',
                },
                dateUtcAdd: new Date(),
                dateUtcModified: new Date(),
            }
            const newAr = [newPostPart]
            return {
                ...state,
                isLoading:false,
                post: {
                    ...state.post,
                    postParts: [...state.post.postParts,...newAr]
                }
            };
        }
        case addnewpost.AddNewPostActionTypes.ADD_POSTPART_FAIL: {
            return {
                ...state,
                isLoading:false,
                error:'Oops an error!'
            };
        }  
        case addnewpost.AddNewPostActionTypes.SET_POSTPART_IMAGE: {
            return state;
        }
        case addnewpost.AddNewPostActionTypes.SET_POSTPART_IMAGE_SUCCESS: {
            return {
                ...state,
                isLoading:false,
                isPostPartPending:false,
                post: {
                    ...state.post,
                    postParts: state.post.postParts.map(pp => pp.id === action.payload.postPartId  ?
                    // set seen the one with a matching id
                    { ...pp, image:{ 
                        dimension : '',
                        lazyUrl:'',
                        smallUrl :'',
                        url:action.payload.largeImageUrl,
                        extension:''
                    } } :
                    // otherwise return original notification
                    pp
                ),
                }
            };
        }
        case addnewpost.AddNewPostActionTypes.SET_POSTPART_IMAGE_FAIL: {
            return {
                ...state,
                isLoading:false,                
                isPostPartPending:false
            };
        }     
        case addnewpost.AddNewPostActionTypes.REMOVE_POSTPART: {
            return {
                ...state,
                isLoading:true
            };
        }
        case addnewpost.AddNewPostActionTypes.REMOVE_POSTPART_SUCCESS: {
            return {
                ...state,
                isLoading:false,
                post: {
                    ...state.post,
                    postParts: state.post.postParts.
                            filter((postpart)=> postpart.id != action.payload.postPartId),
                }
            };
        }
        case addnewpost.AddNewPostActionTypes.REMOVE_POSTPART_FAIL: {
            return {
                ...state,
                isLoading:false
            };
        }    
        default: {
            return state;
        }
    }
}