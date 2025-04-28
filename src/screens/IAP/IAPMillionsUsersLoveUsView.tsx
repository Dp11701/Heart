import icTrustedBy from '../../assets/icTrustedBy.png'
import icStar from '../../assets/icStar.png'

import {z} from "zod";
import {IAPConfig} from "../../models/IAPConfig";

const CommentModel = z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    time: z.string(),
    star: z.number()
})
type CommentModel = z.infer<typeof CommentModel>

interface CommentViewProps {
    comment: CommentModel
}

function CommentView(props: CommentViewProps) {
    return <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        border: '2px solid #E3E1E1',
        padding: 16,
        borderRadius: 20,
        height: 150,
        width: 312,
        gap: 12
    }}>
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 312
            }}
        >
            <span style={{ fontSize: 20, fontWeight: 600, textAlign: 'start'}}>{props.comment.title}</span>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {
                    Array(props.comment.star).fill(0).map((_, idx) => {
                        return <img key={idx} src={icStar} alt={''} style={{width: 18, height: 18}}/>
                    })
                }
            </div>
        </div>

        <span style={{
            textAlign: 'start',
            fontSize: 16,
            color: '#59617A'
        }}>{props.comment.description}</span>

        <span style={{
            position: 'absolute',
            bottom: 16,
            textAlign: 'start',
            fontSize: 14,
            color: '#2D3142'
        }}>{`-${props.comment.author}, ${props.comment.time}`}</span>
    </div>
}

export function IAPMillionsUsersLoveUsView(props: { config: IAPConfig }) {
    const parts = props.config.millionsOfUsers.split('%@')
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20
    }}>
        <h2 style={{
            textAlign: 'start',
            margin: '0px 24px',
            marginTop: 24
        }}>
            {parts[0]}
            {<span style={{ color: "#FF3D60" }}>{props.config.millionsOfUseHighlight}</span>}
            {parts[1]}
        </h2>

        <div style={{
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'auto',
            padding: '0px 24px',
            gap: 16,
            scrollbarWidth: 'none'
        }}>
            <CommentView key={0} comment={{
                title: "Fantastic Experience!",
                description: "This app helped me lower my blood pressure!",
                author: "Mark",
                time: "52 years old",
                star: 5
            }}/>

            <CommentView key={1} comment={{
                title: "Fantastic Experience!",
                description: "This app helped me lower my blood pressure!",
                author: "Mark",
                time: "52 years old",
                star: 5
            }}/>

            <CommentView  key={2} comment={{
                title: "Fantastic Experience!",
                description: "This app helped me lower my blood pressure!",
                author: "Mark",
                time: "52 years old",
                star: 5
            }}/>

            <CommentView key={3} comment={{
                title: "Fantastic Experience!",
                description: "This app helped me lower my blood pressure!",
                author: "Mark",
                time: "52 years old",
                star: 5
            }}/>
        </div>
        <img src={icTrustedBy} alt={''} style={{
            margin: '0px 24px',
            aspectRatio: 1655/710
        }}/>
    </div>
}