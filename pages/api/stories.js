import Story from '../../models/Story';
import { connectDB } from '../../src/connectDB';

connectDB();

export default async (req, res) => {

    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const stories = await Story.find();
                return res.status(200).json({ success: true, data: stories });
            } catch (err) {
                return res.status(400).json({ success: false, error: err });
            }

        case 'POST':
            try {
                const story = await Story.create(req.body);
                return res.status(201).json({ success: true, data: story, msg: 'Story added' });
            } catch (err) {
                return res.status(400).json({ success: false, error: err });
            }

    }
}