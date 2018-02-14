import s from 'underscore.string';

RocketChat.saveRoomCustomFields = function(rid, roomCustomFields, user, sendMessage = true) {
	if (!Match.test(rid, String)) {
		throw new Meteor.Error('invalid-room', 'Invalid room', {
			'function': 'RocketChat.saveRoomCustomFields'
		});
	}
	const update = RocketChat.models.Rooms.setTopicById(rid, roomCustomFields);
	if (update && sendMessage) {
		RocketChat.models.Messages.createRoomSettingsChangedWithTypeRoomIdMessageAndUser('room_changed_customFields', rid, roomCustomFields, user);
	}
	return update;
};
